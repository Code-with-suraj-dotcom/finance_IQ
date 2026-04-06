import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFinance } from "../context/FinanceContext";
import { useNavigate } from "react-router-dom";

// Validation Schema
const schema = yup.object({
  title: yup.string().required("Title is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),
  category: yup.string().required("Category is required"),
  type: yup.string().required("Type is required"),
  date: yup.string().required("Date is required"),
});

function AddTransaction() {
  const { addTransaction } = useFinance();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    addTransaction(data);
    navigate("/transactions");
  };

  return (
    <div className="fi-page">
      <div className="fi-card max-w-2xl space-y-5">
        <h2 className="fi-title">Add Transaction</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div className="space-y-1.5">
          <input className="fi-input" placeholder="Title" {...register("title")} />
          <p className="min-h-5 text-sm text-red-600">{errors.title?.message}</p>
        </div>

        {/* Amount */}
        <div className="space-y-1.5">
          <input className="fi-input" type="number" placeholder="Amount" {...register("amount")} />
          <p className="min-h-5 text-sm text-red-600">{errors.amount?.message}</p>
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <select className="fi-input" {...register("category")}>
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Rent">Rent</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Utilities">Utilities</option>
            <option value="Subscriptions">Subscriptions</option>
          </select>
          <p className="min-h-5 text-sm text-red-600">{errors.category?.message}</p>
        </div>

        {/* Type */}
        <div className="space-y-1.5">
          <select className="fi-input" {...register("type")}>
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <p className="min-h-5 text-sm text-red-600">{errors.type?.message}</p>
        </div>

        {/* Date */}
        <div className="space-y-1.5">
          <input className="fi-input" type="date" {...register("date")} />
          <p className="min-h-5 text-sm text-red-600">{errors.date?.message}</p>
        </div>

        {/* Notes */}
        <div className="space-y-1.5">
          <textarea className="fi-input min-h-24" placeholder="Notes" {...register("notes")} />
        </div>

        {/* Recurring Checkbox */}
        <div className="space-y-1.5 flex items-center gap-3">
          <input
            type="checkbox"
            id="recurring"
            {...register("recurring")}
            className="h-4 w-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="recurring" className="text-sm font-medium text-gray-700 cursor-pointer">
            Mark as recurring
          </label>
        </div>

        <button className="fi-btn-primary w-full sm:w-auto" type="submit">Add Transaction</button>
      </form>
      </div>
    </div>
  );
}

export default AddTransaction;
