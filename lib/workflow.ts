import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QstashClient, resend } from "@upstash/qstash";

import config from "@/lib/config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qtashUrl,
  token: config.env.upstash.qtashToken,
});

const qstashClient = new QstashClient({ token: config.env.upstash.qtashToken });
export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendToken }),
    },
    body: {
      from: "Ananda Muhammad <hello.anandamuhammad.site>",
      to: [email],
      subject,
      html: message,
    },
  });
};
