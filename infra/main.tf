locals {
  region = "eu-central-1"
}

provider "aws" {
  region = local.region
}

module "s3-bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "3.13.0"

  bucket = "repo-analyzer-front"

  acl = "public-read"

  cors_rule = [
    {
      allowed_headers = ["*"]
      allowed_methods = ["GET", "POST"]
      max_age_seconds = 3600
      allowed_origins = ["*"]
    }
  ]

  website = {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_object" "frontdata" {
  for_each = fileset("../frontend/dist/", "*")


  bucket = module.s3-bucket.s3_bucket_arn
  key    = each.value
  source = "../frontend/dist/${each.value}"
}