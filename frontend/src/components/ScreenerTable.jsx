// frontend/src/components/ScreenerTable.jsx
import StockRow from './StockRow';

export default function ScreenerTable({ stocks }) {
  if (!stocks || stocks.length === 0) {
    return (
      <div className="bg-white p-12 text-center rounded-lg shadow-md border border-gray-200">
        <p className="text-gray-500 text-lg" style={{fontFamily: 'Helvetica, sans-serif'}}>Tidak ada saham yang lolos screening hari ini.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-600" style={{fontFamily: 'Helvetica, sans-serif'}}>
        <thead className="bg-gradient-to-r from-slate-700 to-slate-800 text-white uppercase text-xs">
          <tr>
            <th className="p-3 rounded-tl-lg">Ticker</th>
            <th className="p-3">Harga</th>
            <th className="p-3">% Change</th>
            <th className="p-3">Skor</th>
            {/* Sembunyikan di Mobile */}
            <th className="p-3 hidden md:table-cell">RSI</th>
            <th className="p-3 hidden md:table-cell">Vol×</th>

            <th className="p-3 rounded-tr-lg">Signal</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <StockRow key={stock.ticker} data={stock} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
