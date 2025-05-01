import { ButtonContainer, Circle } from './styles';

type ToggleButtonProps = {
  checked: boolean;
  handleClick: () => void;
  width?: number;
  height?: number;
};

export function ToggleButton({
  checked,
  handleClick,
  width,
  height,
}: ToggleButtonProps) {
  return (
    <ButtonContainer
      $checked={checked}
      $width={width}
      $height={height}
      onClick={handleClick}
    >
      <Circle $checked={checked} />
    </ButtonContainer>
  );
}
