terraform {
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "~> 5.3.0"
        }
    }

    required_version = "~> 1.5.0"

    backend "s3" {
        bucket = "tfstate-bucket-bpt"
        region = "eu-central-1"
        key    = "dev"
    }
}

provider "aws" {
    region = "eu-central1"
}

resource "aws_s3_bucket" "frontbucket" {
    bucket = "repo-analyzer-front"
}
