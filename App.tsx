import React, { useState, useMemo } from 'react';
import type { Case } from './types';
import { CaseForm } from './components/CaseForm';
import { CaseList } from './components/CaseList';
import { ScaleIcon } from './components/icons/ScaleIcon';

const App: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddCase = (newCase: Omit<Case, 'id' | 'submissionDate'>) => {
    const caseWithId: Case = {
      ...newCase,
      id: crypto.randomUUID(),
      submissionDate: new Date(),
    };
    setCases(prevCases => [caseWithId, ...prevCases]);
  };

  const filteredCases = useMemo(() => {
    if (!searchTerm) {
      return cases;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return cases.filter(caseItem =>
      caseItem.caseName.toLowerCase().includes(lowercasedFilter) ||
      caseItem.fileCode.toLowerCase().includes(lowercasedFilter) ||
      caseItem.legalAidProvider.toLowerCase().includes(lowercasedFilter) ||
      caseItem.successCriterion.toLowerCase().includes(lowercasedFilter)
    );
  }, [cases, searchTerm]);


  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <ScaleIcon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Hệ thống Báo cáo Vụ việc TGPL
              </h1>
              <p className="text-sm text-slate-500">
                Trung tâm Trợ giúp pháp lý Nhà nước số 2
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <CaseForm onSubmit={handleAddCase} />
        </div>
        <div className="lg:col-span-2">
          <CaseList 
            cases={filteredCases}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>
      </main>
       <footer className="text-center py-4 mt-8 text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Trung tâm TGPL NN số 2. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;