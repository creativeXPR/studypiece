# StudyPiece Java runner: JDK 17 (javac + a JVM for learners' programs), a virtual
# display for Swing pictures, fonts, and su-exec to run programs as `nobody`.
# Alpine's own OpenJDK, because the Temurin Alpine images leave out the desktop libraries.
FROM alpine:3.20

RUN apk add --no-cache openjdk17-jdk openjdk17-jre xvfb fontconfig ttf-dejavu su-exec \
    libx11 libxext libxrender libxtst libxi freetype \
 && fc-cache -f

ENV PATH=/usr/lib/jvm/java-17-openjdk/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

WORKDIR /app
COPY src/ /app/src/
RUN javac -d /app/classes /app/src/*.java \
 && jar cf /app/runner.jar -C /app/classes . \
 && rm -rf /app/classes /app/src
COPY sandbox.policy start.sh /app/

ENV PORT=8080
CMD ["sh", "/app/start.sh"]
