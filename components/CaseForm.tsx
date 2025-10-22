import React, { useState } from 'react';
import type { Case } from '../types';
import { CaseQuality } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { CheckIcon } from './icons/CheckIcon';

interface CaseFormProps {
  onSubmit: (newCase: Omit<Case, 'id' | 'submissionDate'>) => void;
}

const initialFormData = {
  caseName: '',
  fileCode: '',
  legalAidProvider: '',
  successCriterion: '',
  quality: CaseQuality.GOOD,
  notes: '',
};

export const CaseForm: React.FC<CaseFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({...prev, quality: e.target.value as CaseQuality}));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.caseName || !formData.fileCode || !formData.legalAidProvider || !formData.successCriterion) {
      alert('Vui lòng điền đầy đủ các trường bắt buộc.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit(formData);
      setFormData(initialFormData);
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg sticky top-8">
      <h2 className="text-xl font-bold mb-6 text-slate-800 border-b pb-3">Thêm Vụ việc Thành công Mới</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="caseName" className="block text-sm font-medium text-slate-700 mb-1">Tên vụ việc</label>
          <input
            type="text"
            id="caseName"
            name="caseName"
            value={formData.caseName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="VD: Vụ án tranh chấp đất đai ABC"
          />
        </div>
        <div>
          <label htmlFor="fileCode" className="block text-sm font-medium text-slate-700 mb-1">Mã hồ sơ vụ việc</label>
          <input
            type="text"
            id="fileCode"
            name="fileCode"
            value={formData.fileCode}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="VD: HS-2024-123"
          />
        </div>
        <div>
          <label htmlFor="legalAidProvider" className="block text-sm font-medium text-slate-700 mb-1">TGV thực hiện</label>
          <input
            type="text"
            id="legalAidProvider"
            name="legalAidProvider"
            value={formData.legalAidProvider}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="VD: Nguyễn Văn A"
          />
        </div>
        <div>
          <label htmlFor="successCriterion" className="block text-sm font-medium text-slate-700 mb-1">Tiêu chí thành công</label>
          <textarea
            id="successCriterion"
            name="successCriterion"
            value={formData.successCriterion}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Mô tả chi tiết tiêu chí thành công của vụ việc..."
          />
        </div>
         <div>
          <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1">Ghi chú chi tiết (Tùy chọn)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Thêm thông tin, diễn biến chính, hoặc những điểm cần lưu ý..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Chất lượng vụ việc</label>
          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="quality"
                value={CaseQuality.GOOD}
                checked={formData.quality === CaseQuality.GOOD}
                onChange={handleRadioChange}
                className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span className="text-slate-800">Tốt</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="quality"
                value={CaseQuality.FAIR}
                checked={formData.quality === CaseQuality.FAIR}
                onChange={handleRadioChange}
                className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span className="text-slate-800">Khá</span>
            </label>
          </div>
        </div>
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : showSuccess ? (
              <>
                <CheckIcon className="h-5 w-5 mr-2"/>
                <span>Đã thêm thành công!</span>
              </>
            ) : (
               <>
                <PlusIcon className="h-5 w-5 mr-2"/>
                <span>Thêm Báo cáo</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};