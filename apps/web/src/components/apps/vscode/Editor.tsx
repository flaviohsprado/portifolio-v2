import type { ContentCodeEnum, Project } from "@portifolio-v2/config";
import { CodeEditor } from "./Code";

interface EditorProps {
   project: Project;
   contentCode: ContentCodeEnum;
}

export function Editor({ project, contentCode }: EditorProps) {
   return (
      <div className="flex flex-1 flex-col">
         <CodeEditor project={project} />
         {/* {contentCode === ContentCodeEnum.PROJECT && <CodeEditor project={project} />}
         {contentCode === ContentCodeEnum.ISSUE && <IssueEditor project={project} />}
         {contentCode === ContentCodeEnum.ENV && <EnvEditor project={project} />} */}
      </div>
   );
}
