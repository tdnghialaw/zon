import React, { useState } from 'react';
import type { Case } from '../types';
import { CaseQuality } from '../types';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ChevronUpIcon } from './icons/ChevronUpIcon';
import { DocumentArrowDownIcon } from './icons/DocumentArrowDownIcon';


interface CaseListProps {
  cases: Case[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const QualityBadge: React.FC<{ quality: CaseQuality }> = ({ quality }) => {
  const isGood = quality === CaseQuality.GOOD;
  const bgColor = isGood ? 'bg-green-100' : 'bg-yellow-100';
  const textColor = isGood ? 'text-green-800' : 'text-yellow-800';
  const dotColor = isGood ? 'bg-green-500' : 'bg-yellow-500';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      <svg className={`-ml-0.5 mr-1.5 h-2 w-2 ${dotColor}`} fill="currentColor" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="3" />
      </svg>
      {quality}
    </span>
  );
};

const CaseItem: React.FC<{ caseItem: Case }> = ({ caseItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="p-4 border border-slate-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-shadow duration-200 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-blue-700">{caseItem.caseName}</h3>
          <p className="text-sm text-slate-500">Mã HS: {caseItem.fileCode}</p>
        </div>
        <QualityBadge quality={caseItem.quality} />
      </div>
      
      <div className="mt-4 pt-3 border-t border-slate-100 text-sm space-y-2">
        <p><span className="font-semibold w-28 inline-block">TGV thực hiện:</span> {caseItem.legalAidProvider}</p>
        <p>
          <span className="font-semibold w-28 inline-block align-top">Tiêu chí:</span> 
          <span className="inline-block w-[calc(100%-120px)]">
            {caseItem.successCriterion}
          </span>
        </p>
      </div>

      {caseItem.notes && (
        <div className="mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 focus:outline-none"
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Ẩn chi tiết' : 'Xem chi tiết'}
            {isExpanded ? <ChevronUpIcon className="h-4 w-4 ml-1" /> : <ChevronDownIcon className="h-4 w-4 ml-1" />}
          </button>
          {isExpanded && (
            <div className="mt-2 p-3 bg-slate-50 rounded-md border border-slate-200 text-sm text-slate-700 whitespace-pre-wrap">
              <p className="font-semibold mb-2 text-slate-800">Ghi chú:</p>
              {caseItem.notes}
            </div>
          )}
        </div>
      )}

      <p className="text-right text-xs text-slate-400 mt-4 pt-3 border-t border-slate-100">
        Ngày báo cáo: {caseItem.submissionDate.toLocaleDateString('vi-VN')}
      </p>
    </div>
  );
};


export const CaseList: React.FC<CaseListProps> = ({ cases, searchTerm, onSearchChange }) => {
  const handleExport = () => {
    const XLSX = (window as any).XLSX;
    if (!XLSX || cases.length === 0) {
      alert("Không có dữ liệu để xuất hoặc thư viện xuất file bị lỗi.");
      return;
    }

    const dataToExport = cases.map(c => ({
      'Tên vụ việc': c.caseName,
      'Mã hồ sơ': c.fileCode,
      'TGV thực hiện': c.legalAidProvider,
      'Tiêu chí thành công': c.successCriterion,
      'Chất lượng': c.quality,
      'Ghi chú': c.notes || '',
      'Ngày báo cáo': c.submissionDate.toLocaleDateString('vi-VN'),
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Danh sách vụ việc');
    
    // Create a dynamic filename with the current date
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const fileName = `Bao_cao_vu_viec_TGPL_${year}-${month}-${day}.xlsx`;

    XLSX.writeFile(wb, fileName);
  };
  
  if (cases.length === 0 && !searchTerm) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <BriefcaseIcon className="mx-auto h-12 w-12 text-slate-400" />
        <h3 className="mt-2 text-lg font-medium text-slate-900">Chưa có báo cáo nào</h3>
        <p className="mt-1 text-sm text-slate-500">Hãy bắt đầu bằng cách thêm một vụ việc mới từ biểu mẫu bên cạnh.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="text-xl font-bold text-slate-800">Danh sách Vụ việc</h2>
        <button
            onClick={handleExport}
            disabled={cases.length === 0}
            className="flex items-center bg-green-600 text-white text-sm font-semibold py-2 px-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out disabled:bg-slate-400 disabled:cursor-not-allowed"
            aria-label="Xuất danh sách ra file Excel"
          >
            <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
            <span>Xuất Excel</span>
          </button>
      </div>
      
      <div className="relative mb-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
        </span>
        <input 
            type="text"
            placeholder="Tìm kiếm theo tên vụ việc, mã hồ sơ, TGV..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            aria-label="Tìm kiếm vụ việc"
        />
      </div>

      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 bg-slate-50 p-2 rounded-lg">
        {cases.length > 0 ? (
           cases.map((caseItem) => (
            <CaseItem key={caseItem.id} caseItem={caseItem} />
          ))
        ) : (
          <div className="text-center py-10 text-slate-500">
            <p className="font-medium">Không tìm thấy kết quả nào</p>
            <p className="text-sm">Vui lòng thử lại với từ khóa khác.</p>
          </div>
        )}
      </div>
    </div>
  );
};