# Movie Management SPA

A **Single Page Application (SPA)** for managing movies, built with **React**, **Ant Design**, and **GraphQL**.  
The app allows you to view, add, update, and delete movies, including details like genre, release date, and reviews.

---

## 🔹 Technologies

**Frontend:**
- React (with TypeScript)
- Ant Design
- Apollo Client (GraphQL)
- React Router

**Backend:**
- ASP.NET Core (.NET 7)
- Entity Framework Core
- GraphQL.NET

**Database:**
- SQL Server (or any EF Core supported database)

---

## 📦 Installation & Running

### Backend
1. Open `ServerApp/Movie`.
2. Update the connection string in `appsettings.json`.
3. Apply database migrations:
   ```bash
   dotnet ef database update


Run the backend:

bash
Copy
Edit
dotnet run
The GraphQL endpoint will be available at https://localhost:7230/graphql.

Frontend
Open ClientApp.

Install dependencies:

bash
Copy
Edit
npm install
Run the frontend:

bash
Copy
Edit
npm start
The SPA will run at http://localhost:3000.

📝 Features
Paginated movie table with sticky header

Select and highlight table rows

Add new movies

Update existing movies

Delete movies

Manage movie genres using enums

Display review status

Change page size dynamically

Modern responsive UI using Ant Design

⚡ Important Notes
CORS: Ensure backend allows access from http://localhost:3000 during development.

Enums: Genre values must match backend enums exactly (case-sensitive).

GraphQL InputType: Use InputType classes to map frontend data, not the EF model.

Row Selection: Uses onRow and selectedRow state for highlighting.

📁 Project Structure
bash
Copy
Edit
ClientApp
  /components
    Table.tsx
    Form.tsx
  /services
    services.ts
  /types
    MovieTableViewModel.ts
    FormViewModel.ts
    TablePaginationConfig.ts
  /layouts
    formLayouts.tsx
  pages
    HomePage.tsx
    AddPage.tsx
    EditPage.tsx

ServerApp
  /Movie
    /GraphQL
      Types
        MovieType.cs
        InputTypes
          MovieInputType.cs
        Enums
          MovieGenreType.cs
    /Models
      Movie.cs
      Enums
        MovieGenre.cs
🚀 Future Improvements
Add search and filtering in the table

User authentication & role management

Server-side pagination for better performance

Unit and integration tests for frontend and backend

💬 Contact
For questions or suggestions, feel free to create an issue or submit a PR.

yaml
Copy
Edit

---

