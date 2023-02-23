import { TopicCreateTransaction, TopicMessageSubmitTransaction } from "@hashgraph/sdk";
import { client } from "src/utils/client";
import { env } from "src/utils/env";
import { log } from "src/utils/log";

export class ConsensusUseCases {
  static async createProtectedTopic() {
    const tx = new TopicCreateTransaction()
      .setSubmitKey(env.acc1.publicKey)
      .setTopicMemo("Hedera HG News");

    const txResponse = await tx.execute(client);

    const receipt = await txResponse.getReceipt(client);

    log.info(`transaction consensus status is ${receipt.status}`);

    log.info(`your topic ID is: ${receipt.topicId}`);
  }

  static async submitTimestampAsMessage() {
    const signTx = await new TopicMessageSubmitTransaction({
      topicId: env.topicId,
      message: `this is a timestamp from message submit: ${Date.now().toString()}`,
    })
      .freezeWith(client)
      .sign(env.acc1.privateKey);

    const txResponse = await signTx.execute(client);

    const receipt = await txResponse.getReceipt(client);

    log.info(`transaction consensus status is ${receipt.status}`);
  }

  static async submitMessageFail() {
    const tx = new TopicMessageSubmitTransaction({
      topicId: env.topicId,
      message: "this massage will fail",
    });

    const txResponse = await tx.execute(client);

    try {
      const receipt = await txResponse.getReceipt(client);
      log.info(`transaction consensus status is ${receipt.status}`);
    } catch (error) {
      log.error(error, `failed submitting the message on topic ${env.topicId}`);
    }
  }
}
