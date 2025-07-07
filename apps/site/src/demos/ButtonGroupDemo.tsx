import { ButtonV2, ButtonGroupV2, ButtonTypeV2 } from "blend-v1";

const ButtonGroupDemo = () => {
  return (
    <div>
      <ButtonGroupV2 stacked>
        <ButtonV2 text="Button 1" />
        <ButtonV2 text="Button 2" />
        <ButtonV2 buttonType={ButtonTypeV2.SECONDARY} text="Button 3" />
      </ButtonGroupV2>
    </div>
  );
};

export default ButtonGroupDemo;
