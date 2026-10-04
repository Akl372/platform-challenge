terraform {
  required_version = ">= 1.5.0"
}

variable "application_name" {
  type    = string
  default = "devops-platform-challenge"
}

locals {
  environment = "training"

  metadata = {
    application = var.application_name
    environment = local.environment
  }
}

output "application_metadata" {
  value = local.metadata
}
