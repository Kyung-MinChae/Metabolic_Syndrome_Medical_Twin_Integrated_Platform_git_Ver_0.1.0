import { SectionCard } from "@/components/SectionCard";
import React from "react";
import { ContactForm } from "@/components/ContactForm";

const partners = [
  { name: "건양대학교", role: "융합 연구 및 임상 검증" },
  { name: "시루브", role: "AI 알고리즘" },
  { name: "메쥬", role: "웨어러블 생체신호 기기 개발" },
  { name: "라이트테크놀로지", role: "플랫폼 통합" },
  { name: "스텔라특허사무소", role: "특허 전략/법률 자문" },
];

const Team = () => {
  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold text-center">Team & Partners</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map(p => (
          <SectionCard key={p.name} title={p.name}>
            <p>{p.role}</p>
          </SectionCard>
        ))}
      </div>

      <SectionCard title="문의하기">
        <ContactForm />
      </SectionCard>
    </div>
  );
};

export default Team;