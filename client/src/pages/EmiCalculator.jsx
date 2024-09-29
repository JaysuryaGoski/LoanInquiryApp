import FlexBetween from '../components/FlexBetween';
import { useAuthContext } from '../auth/AuthProvider';

function calculateEmi(amount, rate, time) {
  const rateMonth = Math.pow(1 + rate, time);
  return (amount * rate * rateMonth) / (rateMonth - 1);
}

export default function EmiCalculator() {
  const { state } = useAuthContext();
  const services = state.services || [];
  const [emi, setEmi] = useState({ type: '', code: '', amount: '', tenure: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  return (
    <FlexBetween className="flex-col items-center p-8">
      {services.length > 0 ? (
        <form
          className="w-full max-w-lg p-4 bg-white shadow rounded-lg"
          onSubmit={(e) => {
            e.preventDefault();
            setError('');
            setSuccess('');
            // Your validation and logic here
          }}
        >
          <fieldset className="space-y-4">
            <legend className="text-xl font-semibold">EMI Calculator</legend>

            <div>
              <label className="block mb-1 font-medium">Loan Type</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={emi.type}
                onChange={(e) => setEmi({ ...emi, type: e.target.value })}
              >
                <option value="">--- Select Loan Type ---</option>
                {services.map((service) => (
                  <option key={service.id} value={service.type}>
                    {service.type}
                  </option>
                ))}
              </select>
            </div>
            {/* Add other inputs similarly */}
            <button className="bg-primary-button text-white p-2 rounded-md w-full mt-4">Add</button>
          </fieldset>
          <div className="text-center mt-4">
            <span className="text-red-500">{error}</span>
            <span className="text-green-500">{success}</span>
          </div>
        </form>
      ) : (
        <h4 className="text-lg">No Services Available</h4>
      )}
    </FlexBetween>
  );
}
