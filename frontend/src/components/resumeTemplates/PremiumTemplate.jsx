import { resumeThemes } from "../../constants/resumeThemes";
import EditableText from "../editor/EditableText";
import EditableList from "../editor/EditableList";

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
      className="max-w-3xl mx-auto p-10 "
    >
      {/* NAME */}
      <h1 className={`text-3xl tracking-wider ${t.primary} text-center`}>
        <EditableText
          value={data?.name || "Your Name"}
          isEditing={isEditing}
          onChange={(val) => updateField("name", val)}
        />
      </h1>

      {/* CONTACT */}
      <p className="text-sm text-gray-500 mb-4 space-x-2 text-center">
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
      </p>

      <Divider />

      {/* SUMMARY */}
      <Section title="Summary" theme={t}>
        <EditableText
          value={data?.summary}
          isEditing={isEditing}
          onChange={(val) => updateField("summary", val)}
        />
      </Section>

      {/* EXPERIENCE */}
      <Section title="Experience" theme={t}>
        <EditableList
          items={data?.experience}
          isEditing={isEditing}
          onChange={(val) => updateField("experience", val)}
        />
      </Section>

      {/* PROJECTS */}
      <Section title="Projects" theme={t}>
        <EditableList
          items={data?.projects}
          isEditing={isEditing}
          onChange={(val) => updateField("projects", val)}
        />
      </Section>

      {/* EDUCATION */}
      <Section title="Education" theme={t}>
        <EditableList
          items={data?.education}
          isEditing={isEditing}
          onChange={(val) => updateField("education", val)}
        />
      </Section>

      {/* SKILLS */}
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
    <h3 className={`font-light text-2xl ${theme.primary}`}>{title}</h3>

    <ul className="text-sm mt-1 space-y-1 text-gray-700">{children}</ul>
  </div>
);

const Divider = () => <hr className="my-4 border-gray-300" />;

export default MinimalTemplate;
