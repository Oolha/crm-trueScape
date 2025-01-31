# CRM for Vendors / Admin Panel for Food Delivery Company

A fully-featured CRM web application designed to optimize vendor information management. This application is built using **Next.js** and provides an intuitive interface for managing vendor data, promotions, and sales statistics.

## Features

- **Vendor Management**: Easily manage and display information about vendors, including their country of origin, active status, and current promotions.
- **Promotions**: Add, update, and manage promotions for each vendor through a dedicated form on the vendor's page.
- **Dashboard**: A comprehensive statistics page providing insights into:
  - Total promotions
  - Total categories
  - New companies
  - Total active companies
  - Sales details, including company sales and income
  - Categorized company listings (e.g., Electronics, Food, Grocery, etc.)

## Pages

- **/companies**: Displays a list of all companies with key information such as their status, country of origin, and whether they have active promotions.
- **/companies/[id]**: Displays detailed information about a specific company, including its promotions and an option to add new promotions via a form.
- **/dashboard**: Provides an overview of key statistics such as total promotions, categories, new companies, active companies, and sales details.

## Technologies Used

- **Next.js**: For building the SSR web application with hybrid rendering methods (client-side and server-side components).
- **Tailwind CSS**: For styling the components with utility-first classes.
- **clsx**: For conditional styling in React components.
- **React Query**: For managing server state and fetching data efficiently.

## Setup & Installation

To run the project locally:

npm run dev

1. Clone the repository:

   ```bash
   git clone https://github.com/Oolha/crm-trueScape.git
   cd crm-trueScape
