import { BasicButton } from '@components/Buttons';
import { FieldsProps, Form } from '@components/Form';
import { LayoutContainer } from '@components/LayoutContainer';
import { LoadingPage } from '@components/Loading';
import { categoriesApi } from '@services/categories';
import { CategoryRaw } from '@services/categories/interface';
import { questionFire, toastFire } from '@utils/sweetAlert';
import { useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { IoTrashOutline } from 'react-icons/io5';
import { Separator, Title } from 'styles/main';

import { ButtonsContainer, CategoriesList, CategoryCard, CategoryName } from './styles';

interface IForm {
  id?: number;
  name: string;
}

export function Categories() {
  const [loading, setLoading] = useState(true);
  const [reloadList, setReloadList] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [categories, setCategories] = useState<CategoryRaw[]>([]);
  const [form, setForm] = useState<IForm>({
    name: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const categoryList = await categoriesApi.get(); 
        setCategories(categoryList);
      } catch (err) {
        toastFire((err as Error).message, 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reloadList]);
  
  const reloadComponent = () => {
    setReloadList(!reloadList);
  };

  const handleCancel = () => {
    setForm({ name: '' });
    setEditMode(false);
    setOpenForm(false);
  };
  
  const handleChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async () => {
    if (!form.name) {
      return toastFire('Escolha um nome para categoria', 'warning');
    }

    try {
      setLoading(true);

      if (editMode) {
        if (!form.id) {
          return toastFire('Erro ao atualizar a categoria.', 'error');
        }

        await categoriesApi.update(form);
        toastFire('Categoria atualizada com sucesso');
      } else {
        await categoriesApi.create(form);
        toastFire('Categoria criada com sucesso');
      }

      reloadComponent();
      handleCancel();
    } catch (err) {
      toastFire((err as Error).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = ({ id, name }: {id: number, name: string }) => {
    setForm({ id, name });
    setOpenForm(true);
    setEditMode(true);
  };

  const handleRemove = async (id: number) => {
    try {
      const result = await questionFire();

      if (result.isConfirmed) {
        setLoading(true);

        await categoriesApi.remove(id);

        reloadComponent();
        toastFire('Categoria removida com sucesso');
      }
    } catch (err) {
      toastFire((err as Error).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const fieldsForm: FieldsProps[] = [
    {
      type: 'default',
      name: 'name',
      value: form.name,
      handleChange,
      label: 'Nome',
      placeholder: 'Comida',
      labelInColumn: true
    }
  ];

  const formProps = {
    onSubmit: handleSubmit,
    fields: fieldsForm,
    cancelFunction: handleCancel
  };

  return (
    <LayoutContainer title="Categorias">
      {openForm 
        ? (
          <>
            {editMode 
              ? <Form title="Editar Categoria" {...formProps} />
              : <Form title="Nova Categoria" {...formProps} />
            }
          </>
        ): (
          <BasicButton
            text="Nova Categoria"
            action={() => setOpenForm(true)}
            custonStyle={{ width: '70%', marginTop: '20px' }}
          />
        )
      }

      <Separator $margin={20}/>
      
      <Title $margin='20px 0 0 0'>
        {!categories.length ? 'Nenhuma categoria cadastrada' : 'Categorias cadastradas'}
      </Title>

      <CategoriesList>
        {categories.map(({ id, name }, i) => (
          <CategoryCard key={i}>
            <CategoryName>{name}</CategoryName>

            <ButtonsContainer>
              <BasicButton
                icon={<BiEdit size={20} fill="#F5F5F5" />}
                custonStyle={{ minWidth: 'unset' }}
                action={() => handleEdit({ id, name })}
              />

              <BasicButton
                type='cancel'
                icon={<IoTrashOutline size={20} fill="#F5F5F5" />}
                custonStyle={{ minWidth: 'unset' }}
                action={() => handleRemove(id)}
              />
            </ButtonsContainer>
          </CategoryCard>
        ))}
      </CategoriesList>

      {loading && <LoadingPage />}
    </LayoutContainer>
  );
}