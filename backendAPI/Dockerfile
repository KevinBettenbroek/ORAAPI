FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /backendAPI
COPY requirements.txt /backendAPI/
RUN pip install -r requirements.txt
COPY . /backendAPI/