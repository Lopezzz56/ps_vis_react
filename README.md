# Personal Finance Visualizer

**Personal Finance Visualizer** is a simple, interactive web application designed to empower you to track your spending, analyze financial trends, and stay within your monthly budgets.

Built with a modern and robust stack including **React**, **Tailwind CSS**, **TypeScript**, **Node.js**, and **MongoDB**, it provides clear, intuitive visual insights into your financial habits.

---

## 🚀 Installation

To get started with the Personal Finance Visualizer, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Lopezzz56/ps_vis_react](https://github.com/Lopezzz56/ps_vis_react)
    cd ps_vis_react
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```

**⚙️ Important:** Make sure the backend server (Node.js + Express + MongoDB) is running on `http://localhost:5000` for the application to function correctly.

---

## 🔧 Tech Stack

The Personal Finance Visualizer is built with the following technologies:

* **Frontend:**
    * [React](https://react.dev/) + [Vite](https://vitejs.dev/)
    * [TypeScript](https://www.typescriptlang.org/)
    * [Tailwind CSS](https://tailwindcss.com/)
    * [shadcn/ui](https://ui.shadcn.com/) (for beautifully designed components)
    * [React Router](https://reactrouter.com/) (for navigation)
    * [Sonner](https://sonner.emilkowal.ski/) (for elegant toast notifications)
* **Backend & Database:**
    * [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
    * [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) (for database management)

---

## 📊 Features

The application provides a comprehensive suite of features to manage your finances effectively:

### Dashboard

The dashboard page offers a complete snapshot of your financial status through:

* **Monthly Expenses Bar Chart:** See how your spending trends over time, identifying peak spending periods.
* **Category-wise Pie Chart:** Visualize exactly where your money goes, broken down by category.
* **Budget vs Actual Comparison Chart:** Track whether you are staying within your planned budget limits for each category.
* **Total Expenses:** A clear display of your overall spending for the selected period.
* **Category Breakdown:** A detailed list showing how much you've spent per individual category.
* **Most Recent Transactions:** A quick glance at your latest financial activities.

### Transactions

* **View a comprehensive list of all your recorded transactions.**
* **Filter and sort** transactions by date, amount, or category to quickly find what you're looking for.

### Add Transaction

* Easily add new transactions with essential details like **amount, category, date, and a brief description.**
* Benefit from **real-time validation and feedback** to ensure accurate data entry.

### Add Budget

* **Set or update monthly budgets** on a per-category basis.
* These budgets are **seamlessly integrated** into the budget vs actual visualization on the dashboard, providing immediate feedback on your financial discipline.