FROM openjdk:8-jdk-alpine

RUN apk add --update bash && rm -rf /var/cache/apk/*

RUN wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v1.12.1/opentelemetry-javaagent.jar

COPY build/libs/gs.jar app.jar

COPY ./config/ ./config

ENTRYPOINT ["java","-javaagent:./opentelemetry-javaagent.jar","-jar","-Dspring.profiles.active=docker","/app.jar"]
