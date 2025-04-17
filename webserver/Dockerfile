FROM python:3.13

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONBUFFERED=1
ENV PIP_DISABLE_PIP_VERSION_CHECK=1

RUN apt-get update && apt install -y git curl jq file unzip make gcc g++ libtool

RUN adduser -u 6789 --disabled-password --gecos "" appuser \
 && mkdir /webserver && chown -R appuser /webserver \
 && /usr/local/bin/python -m pip install --upgrade pip


RUN --mount=type=cache,target=/webserver/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    /usr/local/bin/python -m pip install -r requirements.txt

WORKDIR /webserver

COPY . /webserver/
USER appuser

CMD ["/usr/local/bin/python", "./main.py"]
