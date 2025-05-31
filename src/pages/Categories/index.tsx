import { FieldsProps, Form } from '@components/Form';
import { LayoutContainer } from '@components/LayoutContainer';
import { LoadingPage } from '@components/Loading';
import { categoriesApi } from '@services/categories';
import { CategoryRaw } from '@services/categories/interface';
import { toastError, toastSuccess, toastWarn } from '@utils/toast';
import { useEffect, useState } from 'react';

interface IForm {
  name: string;
}

export function Categories() {
  const [loading, setLoading] = useState(true);
  const [reloadList, setReloadList] = useState(false);
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
        toastError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reloadList]);
  
  const handleChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async () => {
    if (!form.name) {
      return toastWarn('Escolha um nome para categoria');
    }

    try {
      setLoading(true);
      await categoriesApi.create(form);
      setForm({ name: '' });
      setReloadList(prev => !prev);
      toastSuccess('Categoria criada com sucesso');
    } catch (err) {
      toastError((err as Error).message);
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

  return (
    <LayoutContainer title="Categorias">
      <Form
        title='Nova Categoria'
        onSubmit={handleSubmit}
        fields={fieldsForm}
      />
      
      {loading && <LoadingPage />}
    </LayoutContainer>
  );
}