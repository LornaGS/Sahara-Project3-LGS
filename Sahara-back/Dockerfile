# First stage: Build the application
FROM maven:3.8.4-openjdk-17 AS build

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY . .
RUN mvn clean package -DskipTests

# Second stage: Create the final lightweight image
FROM openjdk:17-jdk-slim
WORKDIR /usr/app
COPY --from=build /app/target/Items-BE-0.0.1-SNAPSHOT.jar ./sahara-back.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "sahara-back.jar"]
