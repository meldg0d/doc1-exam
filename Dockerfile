# Stage 1: build with Maven and Java 21
FROM maven:3.9.4-eclipse-temurin-21 AS builder
# Set a working directory
WORKDIR /workspace
# Copy only the pom to leverage Docker layer caching of dependencies
COPY pom.xml .
# Download dependencies
RUN mvn dependency:go-offline -B
# Copy the rest of the source code, then build
COPY src ./src
RUN mvn clean package -DskipTests -B
# Stage 2: run on a slim Java 21 runtime
FROM eclipse-temurin:21-jre
# Create app directory
WORKDIR /app
# Copy the built JAR from the builder stage
ARG JAR_FILE=*.jar
COPY --from=builder /workspace/target/${JAR_FILE} app.jar
# Expose the port your Spring Boot app listens on
EXPOSE 8080
# Default JVM options (tweak as needed)
ENV JAVA_OPTS=""
# Run the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]