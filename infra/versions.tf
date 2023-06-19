terraform {
  required_version = "~> 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.3.0"
    }
  }

  backend "s3" {
    bucket = "tfstate-bucket-bpt"
    region = "eu-central-1"
    key    = "dev/terraform.tfstate"
  }
}
