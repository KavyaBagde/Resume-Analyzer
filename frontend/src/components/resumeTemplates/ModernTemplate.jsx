import { resumeThemes } from "../../constants/resumeThemes";
import EditableText from "../editor/EditableText";
import EditableList from "../editor/EditableList";
import EditableTextArea from "../editor/EditableTextArea";

const ModernTemplate = ({
  data,
  innerRef,
  theme = "royalBlue",
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
      className="max-w-5xl mx-auto p-10"
    >
      {/* HEADER */}
      <div className="mb-6">
        <h1 className={`text-3xl font-bold ${t.primary}`}>
          <EditableText
            value={data?.name || "Your Name"}
            isEditing={isEditing}
            onChange={(val) => updateField("name", val)}
          />
        </h1>

        {/* ROLE (light accent) */}
        <p className={`font-medium text-sm mt-1 ${t.secondary}`}>
          <EditableText
            value={data?.role || "Your Role"}
            isEditing={isEditing}
            onChange={(val) => updateField("role", val)}
          />
        </p>

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
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="col-span-2 space-y-6">
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
        </div>

        {/* RIGHT */}
        <div className="col-span-1 space-y-6">
          <Section title="Skills" theme={t}>
            <EditableList
              items={data?.skills}
              isEditing={isEditing}
              onChange={(val) => updateField("skills", val)}
            />
          </Section>

          <Section title="Education" theme={t}>
            <EditableList
              items={data?.education}
              isEditing={isEditing}
              onChange={(val) => updateField("education", val)}
            />
          </Section>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children, theme }) => (
  <div>
    {/* HEADING COLOR ONLY */}
    <h3 className={`text-sm font-bold border-b pb-1 mb-2 ${theme.primary}`}>
      {title.toUpperCase()}
    </h3>

    {/* BODY NEUTRAL */}
    <ul className="text-sm text-gray-700 space-y-2">{children}</ul>
  </div>
);

export default ModernTemplate;
