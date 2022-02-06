FROM openjdk:8-jdk-alpine

RUN apk add --update bash && rm -rf /var/cache/apk/*

COPY build/libs/gs.jar app.jar

COPY ./config/ ./config

ENTRYPOINT ["java","-jar","/app.jar"]
