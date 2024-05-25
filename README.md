# Human Bench Mark Game

---

## Setup

### Backend (`/HumanBenchmarkServer`)

###### prerequisite :

>**In the `/HumanBenchmarkServer/src/main/resources/application.properties` file, you will need to replace the `server.ip` property with your machine's IP address.**

---

1. **navigate to the server root.**

```shell
cd /HumanBenchmarkServer
```

2. **Generate Client Code.**

```shell
mvn verify
```

---

### Frontend (`human-benchmark-app`)

1. **Navigate to the frontend root.**

```shell
cd /human-benchmark-app
```

2. **Install required dependencies.**

```shell
npm i
```

3. **Start the app.**

```shell
npx expo start
```
