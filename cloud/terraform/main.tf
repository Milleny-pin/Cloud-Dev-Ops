provider "aws" {
  region = "us-east-1"
}


resource "aws_eks_cluster" "loja_veloz" {
  name     = "cluster-loja-veloz-producao"
  role_arn = "arn:aws:iam::123456789012:role/eks-role"

  vpc_config {
    subnet_ids = ["subnet-abc123", "subnet-def456"]
  }
}


provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "kubernetes_namespace" "loja_veloz" {
  metadata {
    name = "producao"
  }
}