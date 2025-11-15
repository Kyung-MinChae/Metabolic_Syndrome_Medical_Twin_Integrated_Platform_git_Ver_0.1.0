"use client";

import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "./CodeBlock";
import { FileText, Download, Dot } from "lucide-react";
import { OntologyTree } from "./OntologyTree";
import { ontologyData, summaryTableData } from "./ontologyData";
import { OntologyTable } from "./OntologyTable";

const hierarchyText = `Patient
 ├─ Visit (SHHS1/SHHS2)
 │   ├─ SleepStudy (AHI, SpO2, SleepStage)
 │   ├─ VitalSign (HR, SBP, DBP, BMI)
 │   ├─ DiseaseStatus (HTN, DM, CVD)
 │   └─ MedicationUse
 └─ Lifestyle (Smoking, Alcohol, Activity)`;

const swrlRuleText = `Patient(?p) ^ hasAHI(?p, ?a) ^ swrlb:greaterThan(?a,30)
→ hasDiagnosis(?p, SevereSleepApnea)`;

const sparqlQuery1 = `SELECT ?patient WHERE {
  ?patient a shhs:Patient ;
           shhs:hasAHI ?ahi ;
           shhs:hasDisease shhs:Hypertension .
  FILTER(?ahi >= 15)
}`;

const sparqlQuery2 = `SELECT ?patient ?cvd WHERE {
  ?patient shhs:hasVisit ?v1, ?v2 .
  ?v1 shhs:hasAHI ?ahi .
  ?v2 shhs:hasCVD ?cvd .
  FILTER(?ahi > 30)
}`;

export const OntologySection = () => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "SHHS-Ontology-Results",
  });

  const handleJsonDownload = () => {
    const jsonData = {
      summary: [
        "SHHS 기반 수면·심혈관·대사지표의 의미 기반 통합",
        "RDF/OWL 온톨로지로 추론 가능한 지식 그래프 구현",
        "메디컬 트윈 시뮬레이터의 리스크·처방 엔진으로 활용",
      ],
      sparqlQueries: {
        ahiAndHypertension: sparqlQuery1,
        ahiAndFutureCvd: sparqlQuery2,
      },
      performanceSummary: summaryTableData,
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(jsonData, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "ontology_summary.json";
    link.click();
  };

  return (
    <section id="ontology-results" className="space-y-8">
      <div ref={componentRef} className="p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">SHHS 기반 대사증후군 온톨로지</h1>
          <p className="text-muted-foreground">Ontology-based Medical Twin Knowledge Framework</p>
        </div>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>요약</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {["SHHS 기반 수면·심혈관·대사지표의 의미 기반 통합", "RDF/OWL 온톨로지로 추론 가능한 지식 그래프 구현", "메디컬 트윈 시뮬레이터의 리스크·처방 엔진으로 활용"].map((item, i) => (
                <li key={i} className="flex items-start">
                  <Dot className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Accordion type="single" collapsible className="w-full mt-6">
          <AccordionItem value="item-1">
            <AccordionTrigger>온톨로지 구조</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p><strong>네임스페이스:</strong> http://example.org/shhs_ontology_v2.owl#</p>
              <p><strong>통계:</strong> 클래스 127 / 속성 144 / 인스턴스 9,915</p>
              <p><strong>Reasoner:</strong> Pellet</p>
              <h4 className="font-semibold">계층 개요:</h4>
              <CodeBlock>{hierarchyText}</CodeBlock>
              <h4 className="font-semibold mt-4">시각화:</h4>
              <div className="p-4 bg-gray-50 rounded-lg">
                <OntologyTree data={ontologyData} />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>CSV→OWL 매핑 & 모델링 규칙</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>nsrrid 1명=Patient 1개, 시점별 Visit 분리(SHHS1/2)</p>
              <p><strong>예:</strong> ahi_hp5r → shhs:AHI_Overall</p>
              <h4 className="font-semibold">SWRL 규칙:</h4>
              <CodeBlock>{swrlRuleText}</CodeBlock>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>SPARQL 예시</AccordionTrigger>
            <AccordionContent>
              <Tabs defaultValue="query1">
                <TabsList>
                  <TabsTrigger value="query1">AHI≥15 & 고혈압</TabsTrigger>
                  <TabsTrigger value="query2">AHI>30 & 추후 CVD 발생</TabsTrigger>
                </TabsList>
                <TabsContent value="query1" className="mt-4">
                  <CodeBlock>{sparqlQuery1}</CodeBlock>
                </TabsContent>
                <TabsContent value="query2" className="mt-4">
                  <CodeBlock>{sparqlQuery2}</CodeBlock>
                </TabsContent>
              </Tabs>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>성과 요약 표</AccordionTrigger>
            <AccordionContent>
              <div className="overflow-x-auto">
                <OntologyTable />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>의의 및 확장</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 list-disc pl-5">
                <li>의미기반 통합으로 설명가능·재사용 가능 지식베이스 구축</li>
                <li>SHHS 외 MIMIC/NSRR 등 이기종 데이터로 확장 용이</li>
                <li>시뮬레이터 What-if 결과와 연계해 권고 시나리오 근거 제공</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Button onClick={handlePrint} variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          PDF로 내보내기
        </Button>
        <Button onClick={handleJsonDownload}>
          <Download className="mr-2 h-4 w-4" />
          JSON 다운로드
        </Button>
      </div>
    </section>
  );
};