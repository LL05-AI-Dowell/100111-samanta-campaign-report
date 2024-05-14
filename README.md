## Samanta Campaign Report 

### Step 1: Clone the Repository

First, clone the repository using the following command:

```bash
git clone https://github.com/LL05-AI-Dowell/100111-samanta-campaign-report.git
```

### Setup Instructions

Follow these steps to set up the Samanta campaign report application on your local machine:

#### Environment Configuration

1. Create a `.env` file in the root directory of the cloned repository.
2. Add the following environment variables to it:

```plaintext
PORT=5000
API_KEY="1b834e07-c68b-4bf6-96dd-ab7cdc62f07f"
DATABASE=meta_data_q
COLLECTIONNAME=examplecollection
```

#### Docker Installation

If you haven't already, install Docker from [here](https://docs.docker.com/engine/install/).

#### Run Docker Compose

Execute the following command in the terminal to start the application using Docker Compose:

```bash
docker compose up
```

#### Additional Commands

- **Stop the Containers:**

```bash
docker compose down
```

- **Check Container Logs:**

```bash
docker logs <container_name> -f
```

#### Accessing the Application

- **Backend Health Check:**
  Visit [Backend Health Check](http://localhost:5000/api/v1/healtcheckup/) to ensure that the backend server is running correctly.

- **Frontend Access:**
  The frontend of the Exchange Thought application is accessible at [Frontend](http://localhost:5173/server-status).

---

These steps should provide a comprehensive guide to setting up and running the Samanta campaign report application on your local machine.
