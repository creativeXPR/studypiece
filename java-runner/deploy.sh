#!/bin/bash
# Builds and deploys the Java runner to Cloud Run. Run from anywhere: bash java-runner/deploy.sh
# The service gets its own service account with no roles, so learners' code has nothing to
# steal if it ever got past the sandbox. Limits keep the cost near zero: it scales to zero
# when idle and to at most 2 instances under load.
set -e
PROJECT=quick-cbt
REGION=europe-west1
SA="java-runner@$PROJECT.iam.gserviceaccount.com"
cd "$(dirname "$0")"

gcloud iam service-accounts describe "$SA" --project "$PROJECT" >/dev/null 2>&1 \
  || gcloud iam service-accounts create java-runner --project "$PROJECT" --display-name "StudyPiece Java runner (no roles)"

# A private key for testing the runner without signing in. Never committed.
[ -f .runner-key ] || openssl rand -hex 24 > .runner-key

gcloud run deploy java-runner \
  --source . \
  --project "$PROJECT" \
  --region "$REGION" \
  --service-account "$SA" \
  --allow-unauthenticated \
  --execution-environment gen1 \
  --memory 1Gi --cpu 1 \
  --concurrency 3 --min-instances 0 --max-instances 2 \
  --timeout 60 \
  --cpu-boost \
  --set-env-vars "RUNNER_KEY=$(cat .runner-key),SLOTS=3"
