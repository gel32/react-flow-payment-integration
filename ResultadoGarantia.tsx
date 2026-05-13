import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

interface ResumenPago {
  flowOrder: number;
  commerceOrder: string;
  requestDate: string;
  status: number;
  subject: string;
  amount: string;
  payer: string;
  // Campos adicionales que mencionaste antes
  paymentMethod?: string;
  currency?: string;
}

const ResultadoGarantia: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [datos, setDatos] = useState<ResumenPago | null>(null);
  const [cargando, setCargando] = useState(true);

  const tokenFlow = searchParams.get('token');

  useEffect(() => {
    const consultarEstadoFlow = async () => {
      if (!tokenFlow) {
        setCargando(false);
        return;
      }
      try {
        const response = await fetch(
          `https://apipagos-hye7bcbycecxegcn.eastus2-01.azurewebsites.net/api/Flow/estado/${tokenFlow}`,
          { method: 'GET', headers: { 'accept': '*/*' } }
        );
        if (response.ok) {
          const data = await response.json();
          setDatos(data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setCargando(false);
      }
    };
    consultarEstadoFlow();
  }, [tokenFlow]);

  if (cargando) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!datos || (datos.status !== 1 && datos.status !== 2)) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600">Error en el pago</h2>
          <button onClick={() => navigate('/')} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg">Volver</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 px-4 flex items-center justify-center font-sans">
      <div className="max-w-[600px] w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
        <div className="flex justify-center mb-8">
          <div className="bg-[#6FCF97] p-5 rounded-full text-white">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-[32px] font-bold text-[#1D1D1D] mb-2">¡Pago recibido!</h2>
          <p className="text-[#666666]">El resumen de tu transacción se detalla a continuación:</p>
        </div>

        <div className="bg-[#F8F9FA] rounded-2xl p-6 mb-8 space-y-4 border border-gray-50">
          <div className="flex justify-between">
            <span className="text-gray-500">Descripción</span>
            <span className="font-medium text-right max-w-[200px]">{datos.subject}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Orden de Comercio</span>
            <span className="font-medium">{datos.commerceOrder}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Orden Flow</span>
            <span className="font-medium">#{datos.flowOrder}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Fecha</span>
            <span className="font-medium">{datos.requestDate}</span>
          </div>
          <div className="h-px bg-gray-200 w-full my-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-bold">Monto Total</span>
            <span className="text-blue-600 font-bold text-2xl">${Number(datos.amount).toLocaleString('es-CL')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Pagador</span>
            <span className="font-medium text-right">{datos.payer}</span>
          </div>
        </div>

        <button 
          onClick={() => navigate('/')} 
          className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-4 rounded-xl font-bold transition-all"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default ResultadoGarantia;