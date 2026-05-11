import { resumeThemes } from "../../constants/resumeThemes";
import EditableList from "../editor/EditableList";
import EditableText from "../editor/EditableText";
import EditableTextArea from "../editor/EditableTextArea";

const MinimalTemplate = ({
  data,
  innerRef,
  theme = "executive",
  isEditing,
  setData,
}) => {
  const t = resumeThemes[theme] || resumeThemes.classic;

  const updateField = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div
      ref={innerRef}
      style={{ backgroundColor: "#ffffff", color: "#111827" }}
      className="max-w-3xl mx-auto p-10"
    >
      {/* NAME */}
      <h1 className={`text-3xl font-bold ${t.primary}`}>
        <EditableText
          value={data?.name || "Your Name"}
          isEditing={isEditing}
          onChange={(val) => updateField("name", val)}
        />
      </h1>

      {/* CONTACT */}
      <p className="text-sm text-gray-500 mt-2 space-x-2">
        <EditableText
          value={data?.email || "Your Email"}
          isEditing={isEditing}
          onChange={(val) => updateField("email", val)}
        />
        •
        <EditableText
          value={data?.phone || "Your Phone"}
          isEditing={isEditing}
          onChange={(val) => updateField("phone", val)}
        />
        •
        <EditableText
          value={data?.github || "Your GitHub"}
          isEditing={isEditing}
          onChange={(val) => updateField("github", val)}
        />
      </p>

      <Divider />

      <Section title="Summary" theme={t}>
        <EditableTextArea
          value={data?.summary}
          isEditing={isEditing}
          onChange={(val) => updateField("summary", val)}
        />
      </Section>

      <Section title="Experience" theme={t}>
        <EditableList
          items={data?.experience}
          isEditing={isEditing}
          onChange={(val) => updateField("experience", val)}
        />
      </Section>

      <Section title="Projects" theme={t}>
        <EditableList
          items={data?.projects}
          isEditing={isEditing}
          onChange={(val) => updateField("projects", val)}
        />
      </Section>

      <Section title="Education" theme={t}>
        <EditableList
          items={data?.education}
          isEditing={isEditing}
          onChange={(val) => updateField("education", val)}
        />
      </Section>

      <Section title="Skills" theme={t}>
        <EditableList
          items={data?.skills}
          isEditing={isEditing}
          onChange={(val) => updateField("skills", val)}
        />
      </Section>
    </div>
  );
};

const Section = ({ title, children, theme }) => (
  <div className="mt-5">
    {/* ONLY HEADING COLORED */}
    <h3 className={`font-bold ${theme.primary}`}>{title}</h3>

    {/* BODY ALWAYS NEUTRAL */}
    <ul className="text-sm mt-1 space-y-1 text-gray-700">{children}</ul>
  </div>
);

const Divider = () => <hr className="my-4 border-gray-300" />;

export default MinimalTemplate;
