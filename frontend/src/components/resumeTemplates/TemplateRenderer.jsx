import ModernTemplate from "./ModernTemplate";
import MinimalTemplate from "./MinimalTemplate";
import PremiumTemplate from "./PremiumTemplate";

const TemplateRenderer = ({
  template,
  data,
  theme,
  innerRef,
  isEditing,
  setData,
}) => {
  const props = { data, theme, innerRef, isEditing, setData };

  switch (template) {
    case "minimal":
      return <MinimalTemplate {...props} />;

    case "premium":
      return <PremiumTemplate {...props} />;

    default:
      return <ModernTemplate {...props} />;
  }
};

export default TemplateRenderer;
