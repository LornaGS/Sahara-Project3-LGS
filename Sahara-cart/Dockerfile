# First stage: Build the application
FROM maven:3.8.4-openjdk-17 AS build

# Set working directory inside the container
WORKDIR /app

# Copy the pom.xml and install dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the entire project
COPY . .

# Build the application without running tests
RUN mvn clean package -DskipTests

# Second stage: Create the final lightweight image
FROM openjdk:17-jdk-slim

# Set working directory for the app
WORKDIR /usr/app

# Copy the built JAR file from the first stage
COPY --from=build /app/target/Items-BE-0.0.1-SNAPSHOT.jar ./sahara-back.jar

# Expose port
EXPOSE 8083

# Command to run the application
ENTRYPOINT ["java", "-jar", "sahara-back.jar"]

