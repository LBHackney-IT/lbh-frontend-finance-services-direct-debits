provider "aws" {
  region  = "eu-west-2"
  version = "~> 2.0"
}
terraform {
  backend "s3" {
    bucket  = "terraform-state-housing-staging"
    encrypt = true
    region  = "eu-west-2"
    key     = "services/finance-services-direct-debits/state"
  }
}
resource "aws_s3_bucket" "frontend-bucket-staging" {
  bucket = "lbh-finance-services-direct-debits-staging.hackney.gov.uk"
  acl    = "private"
  versioning {
    enabled = true
  }
  website {
    index_document = "index.html"
    error_document = "error.html"
  }
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = ["https://finance-services-staging.hackney.gov.uk"]
    expose_headers  = ["x-amz-server-side-encryption","x-amz-request-id","x-amz-id-2"]
    max_age_seconds = 3000
  }
}
module "cloudfront-staging" {
  source = "github.com/LBHackney-IT/aws-hackney-common-terraform.git//modules/cloudfront/s3_distribution"
  s3_domain_name = aws_s3_bucket.frontend-bucket-staging.bucket_regional_domain_name
  origin_id = "mtfh-finance-details-frontend"
  s3_bucket_arn = aws_s3_bucket.frontend-bucket-staging.arn
  s3_bucket_id = aws_s3_bucket.frontend-bucket-staging.id
  orginin_access_identity_desc = "Finance Details frontend cloudfront identity"
  cname_aliases = []
  environment_name = "staging"
  cost_code= "B0811"
  project_name= "MTFH Finance"
  use_cloudfront_cert = true
}
resource "aws_ssm_parameter" "cdn" {
  name  = "/housing-finance-services-direct-debits/staging/app-url"
  type  = "String"
  value = "https://${module.cloudfront-staging.cloudfront_domain_name}"
  overwrite = true
}
