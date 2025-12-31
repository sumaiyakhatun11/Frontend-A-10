# 🐾 PawMart — Pet Adoption & Supply Portal

**PawMart** is a community-driven platform where pet owners, breeders, and shops can list pets for adoption or sell pet-related products (food, toys, accessories, etc.). Buyers and adopters can browse, contact, and order directly.  

---

## 🌐 Live Demo
[View Live PawMart](https://your-live-client-link.com)  

---

## 🛠 Technologies Used
- **Frontend:** React, Next.js, TailwindCSS, React Router, React Hot Toast  
- **Backend:** Node.js, Express.js, Firebase Authentication  
- **Database:** MongoDB  
- **Tools & Deployment:** Vercel, Netlify, Postman, Git & GitHub  

---

## 📸 Screenshots
![Home Page](./screenshots/home.png)  
![Pets & Supplies](./screenshots/pets-supplies.png)  
![Listing Details](./screenshots/listing-details.png)  

---

## ⚡ Core Features
1. User Authentication (Email/Password + Google Login via Firebase)  
2. Dynamic Listings (Pets & Products) with filtering and search  
3. Add, Update, Delete Listings for logged-in users  
4. Place Orders / Adoption Requests with real-time database integration  
5. Download order reports as PDF (jsPDF + jsPDF-AutoTable)  
6. Responsive design — mobile, tablet, and desktop friendly  
7. Dynamic routing with React Router and single-page application architecture  
8. Dark/Light mode toggle & animated UI components  

---

## 🏡 Pages & Functionalities

### **Home Page**
- Banner carousel with 3+ meaningful images  
- Categories: Pets, Food, Accessories, Pet Care Products  
- Recent Listings (latest 6)  
- Awareness sections: “Why Adopt from PawMart?” & “Meet Our Pet Heroes”

### **Authentication**
- Login / Register with email-password & Google  
- Password validation: min 6 characters, uppercase + lowercase  
- Success/Error notifications with React Hot Toast  

### **Add Listing (Private)**
- Add new adoption listings or pet products  
- Fields: Name, Category, Price, Location, Description, Image URL, Date, Email (readonly)  

### **Pets & Supplies Page**
- Displays all available listings in 3-column grid  
- Filter by category  
- “See Details” for each listing  

### **Listing Details (Private)**
- Full details of selected listing  
- Order Modal to adopt/buy products with pre-filled user info  
- Success notification on order submission  

### **My Listings & Orders**
- User-specific listings and orders  
- Edit, Delete, and Download PDF reports for orders  
- Tabular display with relevant details  

### **Additional Features**
- Dynamic page titles per route  
- 404 Page Not Found  
- Loading spinner during API calls  
- Fully responsive & mobile-first  
- Animations using Framer Motion / Typewriter / React Tooltip  

---

## 🧱 Database Structure (MongoDB)

### **Collection: listings**
```json
{
  "name": "Golden Retriever Puppy",
  "category": "Pets",
  "price": 0,
  "location": "Dhaka",
  "description": "Friendly 2-month-old puppy available for adoption.",
  "image": "https://example.com/golden.jpg",
  "email": "owner@gmail.com",
  "date": "2025-10-27"
}
