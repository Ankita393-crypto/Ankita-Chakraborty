import type { SeedCourse } from "../seed-types";

// Aligned with the AWS Certified Cloud Practitioner (CLF-C02) exam guide.
// Service behaviour and exam-domain facts are as published by AWS.
export const awsCloudPractitioner: SeedCourse = {
  slug: "aws-cloud-practitioner-prep",
  title: "AWS Cloud Practitioner — Exam Prep",
  description:
    "Structured preparation for the AWS Certified Cloud Practitioner (CLF-C02) external exam: cloud concepts, global infrastructure, core services, networking, security, and billing. Learnzy prepares you for the exam; the certification is awarded by AWS.",
  category: "certprep",
  tier: 8,
  price_inr: 1499,
  lessons: [
    {
      title: "Cloud Concepts and Benefits",
      content: `Cloud computing is the on-demand delivery of IT resources — compute, storage, databases, and more — over the internet with pay-as-you-go pricing. Instead of buying and maintaining physical servers, you rent exactly what you need from a provider such as AWS and release it when you're done.

The exam tests six classic advantages of cloud: trade capital expense for variable expense; benefit from massive economies of scale; stop guessing capacity; increase speed and agility; stop spending money running data centres; and go global in minutes. Recognising which advantage a scenario describes is a recurring question pattern.

Three service models describe how much the provider manages. Infrastructure as a Service (IaaS) gives you building blocks like virtual machines (Amazon EC2). Platform as a Service (PaaS) manages the underlying platform so you focus on code (AWS Elastic Beanstalk). Software as a Service (SaaS) delivers a finished application you simply use (email services, for example).

Deployment models matter too: a public cloud runs fully on AWS; an on-premises (private) deployment stays in your own data centre; and hybrid connects the two, commonly via AWS Direct Connect or VPN. Migration scenarios in the exam usually hinge on identifying which model a company is using or moving toward.`,
    },
    {
      title: "Global Infrastructure",
      content: `AWS organises the world into Regions — separate geographic areas such as Mumbai (ap-south-1), North Virginia (us-east-1), and Singapore (ap-southeast-1). Each Region is completely independent, and you choose Regions based on latency to users, data-residency laws, service availability, and price, which varies by Region.

Every Region contains multiple Availability Zones (AZs) — physically separate clusters of one or more data centres with independent power, cooling, and networking, connected by high-bandwidth, low-latency links. Running an application across at least two AZs is the standard design for high availability: if one AZ fails, the application keeps running in another.

Edge Locations are a third, much larger network of sites — hundreds worldwide — used by Amazon CloudFront, the content delivery network (CDN). CloudFront caches copies of content close to users so a viewer in Kolkata gets content from a nearby edge site rather than from a server in Virginia. Edge Locations also power Route 53 DNS responses and AWS Global Accelerator.

A helpful mental model for the exam: Regions are where your resources live, Availability Zones are how you survive failures within a Region, and Edge Locations are how content reaches users fast. AWS Local Zones and Wavelength extend infrastructure even closer to users for ultra-low-latency needs.`,
    },
    {
      title: "Compute Services",
      content: `Amazon EC2 (Elastic Compute Cloud) provides resizable virtual servers called instances. You choose an instance type (CPU/memory balance), an operating system image (AMI), and a network placement. EC2 gives you the most control — and the most responsibility, since you manage the guest operating system.

EC2 purchasing options are heavily tested. On-Demand: pay by the second with no commitment — best for unpredictable, short-term workloads. Reserved Instances and Savings Plans: commit to one or three years for discounts up to about 72 percent — best for steady, predictable usage. Spot Instances: bid on spare capacity for discounts up to about 90 percent, accepting that AWS can reclaim the capacity with two minutes' notice — best for interruptible batch work. Dedicated Hosts give you a physical server for licensing or compliance needs.

AWS Lambda is serverless computing: you upload code, and AWS runs it in response to events — an API call, a file landing in S3, a schedule — billing per request and per millisecond of execution. There are no servers to manage or patch, and scaling is automatic. "Run code without provisioning servers" in a question almost always points to Lambda.

Containers have their own family: Amazon ECS (AWS's own container orchestrator), Amazon EKS (managed Kubernetes), and AWS Fargate, which runs containers serverlessly so you don't manage the underlying instances. Elastic Beanstalk sits above all this as a PaaS: you upload an application and it provisions and manages the resources for you.`,
    },
    {
      title: "Storage Services",
      content: `Amazon S3 (Simple Storage Service) is object storage: you store files (objects) in containers called buckets, addressable over the internet. S3 is designed for eleven nines (99.999999999%) of durability, meaning data loss is extraordinarily unlikely. Objects can be up to 5 TB, and common uses include backups, static website hosting, data lakes, and application assets.

S3 offers storage classes at different price points: Standard for frequently accessed data; Standard-Infrequent Access (IA) for data accessed rarely but needing instant retrieval; Intelligent-Tiering, which moves objects between tiers automatically; and the Glacier classes (Instant Retrieval, Flexible Retrieval, Deep Archive) for archives — Deep Archive is the cheapest, with retrieval times up to 12 hours. Lifecycle policies transition objects between classes automatically as they age.

Amazon EBS (Elastic Block Store) provides block storage volumes that attach to a single EC2 instance, like a virtual hard drive — the right answer for databases and operating-system disks. EBS snapshots back volumes up to S3. Instance store is temporary storage physically attached to the host: its data is lost when the instance stops.

Amazon EFS (Elastic File System) is a shared file system that many Linux instances can mount simultaneously and that grows and shrinks automatically. For moving very large datasets into AWS without saturating the network, the Snow family provides physical devices — notably the suitcase-sized Snowball Edge — that AWS ships to you and you ship back.`,
    },
    {
      title: "Database Services",
      content: `Amazon RDS (Relational Database Service) runs managed relational databases — MySQL, PostgreSQL, MariaDB, Oracle, and SQL Server. AWS handles patching, backups, and failover (with Multi-AZ deployments keeping a standby copy in a second Availability Zone), while you design schemas and queries. Choose RDS when data is structured and applications use SQL.

Amazon Aurora is AWS's own relational engine, compatible with MySQL and PostgreSQL but re-architected for the cloud: it offers up to five times MySQL throughput, storage that grows automatically, and six copies of data across three AZs. Aurora is the exam's answer for "high-performance managed relational database built by AWS".

Amazon DynamoDB is the managed NoSQL key-value and document database: serverless, delivering single-digit-millisecond performance at any scale, with no instances to manage. It suits shopping carts, gaming state, session stores, and any workload needing massive scale without SQL joins.

Purpose-built databases round out the family: Amazon Redshift is the data warehouse for analytics across petabytes; Amazon ElastiCache provides in-memory caching with Redis or Memcached for microsecond reads; and Amazon Neptune serves graph workloads such as social networks and recommendations. The exam rewards matching the workload description to the purpose-built engine rather than forcing everything into one database.`,
    },
    {
      title: "Networking and Content Delivery",
      content: `Amazon VPC (Virtual Private Cloud) is your logically isolated slice of the AWS network, where you define IP address ranges and subnets. Public subnets can reach the internet through an Internet Gateway; private subnets cannot be reached from the internet and typically hold databases and application servers, reaching out only through a NAT Gateway when needed.

Two firewall layers protect VPC resources. Security groups act at the instance level, are stateful (return traffic is automatically allowed), and support only allow rules. Network ACLs act at the subnet level, are stateless, and support both allow and deny rules. "Instance-level stateful firewall" versus "subnet-level stateless firewall" is a classic exam distinction.

Amazon Route 53 is the DNS service: it translates names like example.com into IP addresses, registers domains, performs health checks, and routes users by policy — for example latency-based routing to the nearest healthy Region, or failover routing to a standby site.

Amazon CloudFront, the CDN, caches content at Edge Locations worldwide to cut latency and offload origin servers. For dedicated private connectivity between your data centre and AWS, AWS Direct Connect provides a physical line, while Site-to-Site VPN gives encrypted connectivity over the internet — Direct Connect for consistent bandwidth needs, VPN for speed of setup and lower cost.`,
    },
    {
      title: "Security, Identity, and Compliance",
      content: `The Shared Responsibility Model is the most examined concept in the syllabus. AWS is responsible for security OF the cloud: physical facilities, hardware, and the software that runs AWS services. The customer is responsible for security IN the cloud: their data, identity and access management, operating-system patching on EC2, network configuration, and encryption choices. For managed services like Lambda or DynamoDB, more of the stack shifts to AWS — but customer data and access control always remain the customer's job.

AWS IAM (Identity and Access Management) controls who can do what. Users are people or applications; groups collect users; roles are assumed temporarily by services or users and are preferred over long-lived access keys; policies are JSON documents granting permissions. Best practices the exam expects: lock away the root account and enable multi-factor authentication (MFA) on it, grant least privilege, and use roles for EC2 applications instead of embedding keys.

Detection and protection services each have a one-line identity worth memorising: CloudTrail records who did what in your account (API audit log); CloudWatch monitors metrics, logs, and alarms; GuardDuty is intelligent threat detection; Inspector scans workloads for vulnerabilities; WAF blocks malicious web traffic like SQL injection; Shield protects against DDoS attacks; and KMS manages encryption keys.

For compliance paperwork, AWS Artifact provides on-demand access to AWS's compliance reports (such as ISO and SOC reports). Questions about "where do I download AWS's compliance documents" point to Artifact, not to Support.`,
    },
    {
      title: "Pricing, Billing, and Support",
      content: `AWS pricing rests on three drivers: compute time, storage volume, and outbound data transfer (data coming into AWS is generally free; data going out is billed). The pay-as-you-go model means no upfront commitment, though committed-use options (Savings Plans, Reserved Instances) exchange commitment for discounts.

The AWS Free Tier lets you learn cheaply: some offers last 12 months (like a small EC2 instance allowance), some are always free (like one million Lambda requests per month), and some are short-term trials. The AWS Pricing Calculator estimates costs before you build; do not confuse it with tools that analyse your existing spend.

For managing actual spend: AWS Budgets sends alerts when costs or usage exceed thresholds you set; Cost Explorer visualises and analyses historical spending with filtering and forecasting; and Cost and Usage Reports provide the most detailed line-item data. AWS Organizations lets a company manage many accounts centrally with consolidated billing, which aggregates usage for volume discounts.

Support plans in ascending order: Basic (free — documentation, forums, limited health checks), Developer (business-hours email support), Business (24/7 phone and chat, full Trusted Advisor checks, one-hour response for production-down), and Enterprise (adds a designated Technical Account Manager, concierge billing support, and 15-minute response for business-critical outages). Trusted Advisor itself inspects your account against best practices in cost optimisation, performance, security, fault tolerance, and service limits.`,
    },
  ],
  questions: [
    { q: "In the Shared Responsibility Model, AWS is responsible for:", options: ["Customer data", "IAM user permissions", "Security OF the cloud", "Guest OS patching on EC2"], correct: 2 },
    { q: "Which cloud advantage does 'no capacity guessing' describe?", options: ["Economies of scale", "Elasticity matching demand", "Global reach", "CapEx to OpEx"], correct: 1 },
    { q: "AWS Elastic Beanstalk is an example of:", options: ["IaaS", "PaaS", "SaaS", "On-premises"], correct: 1 },
    { q: "An Availability Zone is best described as:", options: ["A geographic area containing Regions", "Isolated data centres within a Region", "A content-caching site", "A billing boundary"], correct: 1 },
    { q: "Edge Locations are used primarily by which service?", options: ["EC2", "CloudFront", "RDS", "VPC"], correct: 1 },
    { q: "The standard design for high availability within a Region is deploying across multiple:", options: ["Regions", "Edge Locations", "Availability Zones", "Accounts"], correct: 2 },
    { q: "Which EC2 purchasing option offers the deepest discount but can be interrupted?", options: ["On-Demand", "Reserved", "Spot", "Dedicated Host"], correct: 2 },
    { q: "AWS Lambda is billed primarily on:", options: ["Instance hours", "Requests and execution duration", "Provisioned storage", "Number of users"], correct: 1 },
    { q: "Which service runs containers without managing servers?", options: ["EC2", "Fargate", "Lightsail", "Outposts"], correct: 1 },
    { q: "Amazon S3 is designed for what durability?", options: ["99.9%", "99.99%", "99.999999999%", "100%"], correct: 2 },
    { q: "The cheapest S3 class for long-term archives with up to 12-hour retrieval is:", options: ["S3 Standard", "S3 Standard-IA", "S3 Intelligent-Tiering", "S3 Glacier Deep Archive"], correct: 3 },
    { q: "Which storage attaches to a single EC2 instance like a virtual hard drive?", options: ["S3", "EBS", "EFS", "Snowball"], correct: 1 },
    { q: "Which service is a managed NoSQL key-value database?", options: ["RDS", "Aurora", "Redshift", "DynamoDB"], correct: 3 },
    { q: "Amazon Redshift is purpose-built for:", options: ["Graph relationships", "In-memory caching", "Data warehousing and analytics", "Message queuing"], correct: 2 },
    { q: "Security groups are:", options: ["Subnet-level and stateless", "Instance-level and stateful", "Region-level firewalls", "DNS filters"], correct: 1 },
    { q: "Which service provides DNS and policy-based routing?", options: ["CloudFront", "Route 53", "Direct Connect", "API Gateway"], correct: 1 },
    { q: "Which service records an audit log of API calls in your account?", options: ["CloudWatch", "CloudTrail", "GuardDuty", "Inspector"], correct: 1 },
    { q: "AWS compliance reports (ISO, SOC) are downloaded from:", options: ["AWS Artifact", "AWS Shield", "Trusted Advisor", "AWS Config"], correct: 0 },
    { q: "Which tool sends alerts when your spending crosses a threshold you set?", options: ["Pricing Calculator", "AWS Budgets", "Cost Explorer", "Organizations"], correct: 1 },
    { q: "Which support plan includes a designated Technical Account Manager?", options: ["Basic", "Developer", "Business", "Enterprise"], correct: 3 },
  ],
};
