import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RESUME_DATA } from "@/lib/constants";
import { Building2, GraduationCap } from "lucide-react";
import { Section } from "./section";

interface ProfileProps {
    accentColor: string;
}

export function Profile({ accentColor }: ProfileProps) {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-light mb-6">About</h1>

            <div className="flex gap-6 items-center bg-[#1f1f1f] p-6 rounded-sm border border-[#333]">
                <Avatar className="size-24 border-2 border-white/10">
                    <AvatarImage src="/images/avatar-placeholder.jpg" />
                    <AvatarFallback className={`${accentColor} text-white text-2xl`}>FP</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-2xl font-semibold">{RESUME_DATA.profile.name}</h2>
                    <p className={`text-lg ${accentColor.replace('bg-', 'text-')}`}>{RESUME_DATA.profile.role}</p>
                    <p className="text-sm text-gray-400 mt-1">{RESUME_DATA.profile.location}</p>
                </div>
            </div>

            <Section title="Bio">
                <p className="text-gray-300 leading-relaxed">{RESUME_DATA.profile.bio}</p>
            </Section>

            <Section title="Experience">
                <div className="space-y-4">
                    {RESUME_DATA.experience.map((exp, i) => (
                        <div key={i} className="bg-[#1f1f1f] p-4 rounded-sm border border-[#333]">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-lg">{exp.role}</h3>
                                <span className="text-xs bg-white/10 px-2 py-1 rounded">{exp.period}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                                <Building2 className="size-4" />
                                <span>{exp.company}</span>
                            </div>
                            <p className="text-sm text-gray-300">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section title="Education">
                {RESUME_DATA.education.map((edu, i) => (
                    <div key={i} className="flex gap-4 items-center bg-[#1f1f1f] p-4 rounded-sm border border-[#333]">
                        <div className="p-3 rounded-full bg-white/5">
                            <GraduationCap className="size-6" />
                        </div>
                        <div>
                            <h3 className="font-medium">{edu.school}</h3>
                            <p className="text-sm text-gray-400">{edu.degree}</p>
                            <span className="text-xs text-gray-500">{edu.period}</span>
                        </div>
                    </div>
                ))}
            </Section>

            <Section title="Technical Skills">
                <div className="flex flex-wrap gap-2">
                    {RESUME_DATA.techStack.map(tech => (
                        <span key={tech} className="px-3 py-1 bg-[#1f1f1f] border border-[#333] rounded-full text-sm hover:border-white/40 transition-colors cursor-default">
                            {tech}
                        </span>
                    ))}
                </div>
            </Section>
        </div>
    )
}