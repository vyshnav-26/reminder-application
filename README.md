# 🔔 Reminder Application

A lightweight, user-friendly reminder application designed to help individuals and teams organize tasks, manage schedules, and never miss an important deadline.

---

## 📌 Features (Planned / Roadmap)

- ⏰ **Custom Reminders**: Create one-time or recurring reminders (daily, weekly, monthly).
- 🏷️ **Categorization & Tags**: Organize tasks by category (Work, Personal, Urgent, etc.) and priority.
- 🔔 **Notifications**: Timely desktop, web, or email alerts when reminders are due.
- 📅 **Calendar & List Views**: Easily view past, current, and upcoming tasks.
- 🔍 **Search & Filter**: Quickly find reminders based on keywords, date ranges, or tags.

---

## 🚀 Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js (v18+)](https://nodejs.org/) & `npm`
- [Docker & Docker Compose](https://www.docker.com/)

---

### Running the Frontend (Local Development)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Copy the sample environment file:
   ```bash
   cp .env.example .env
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### Running via Docker Compose

To launch the frontend with live hot-reloading in Docker:

```bash
docker compose up --build frontend
```

To stop the container:
```bash
docker compose down
```

---

## 🤝 Contributing

We welcome contributions! Please review our [CONTRIBUTION.md](CONTRIBUTION.md) for guidelines on branch management, pull requests, and review workflows before submitting any code.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
