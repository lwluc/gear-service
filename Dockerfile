FROM openjdk:8-jdk-alpine

RUN apk add --update bash && rm -rf /var/cache/apk/*

RUN wget https://github.com/inspectIT/inspectit-oce/releases/download/1.14.0/inspectit-ocelot-agent-1.14.0.jar

COPY build/libs/gs.jar app.jar

COPY ./config/ ./config

ENTRYPOINT ["java","-javaagent:./inspectit-ocelot-agent-1.14.0.jar","-jar","/app.jar"]
