terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.40.0"
    }
  }

  required_version = ">= 1.5.0"

  backend "s3" {
    bucket         = "invoices2-aws-bucket-001"
    key            = "state/terraform.tfstate"
    region         = "eu-central-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}

provider "aws" {
  region = "eu-central-1"
}

resource "aws_s3_bucket" "example" {
  bucket = "invoices2-aws-bucket-001"

  tags = {
    Name        = "Bucket for invoices2 v001"
    Environment = "Dev"
  }
}