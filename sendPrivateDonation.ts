// sendPrivateDonation.ts

import {
  createAztecRpcClient,
  createPXEClient,
  createAndDeployAccount
} from '@aztec/aztec.js';

async function main() {
  const rpcUrl = 'http://localhost:8080';
  const pxeUrl = 'http://localhost:8081';

  const rpc = await createAztecRpcClient(rpcUrl);
  const pxe = createPXEClient(pxeUrl);

  console.log('📦 Creating sender and receiver accounts...');
  const sender = await createAndDeployAccount(rpc, pxe);
  const receiver = await createAndDeployAccount(rpc, pxe);

  console.log('👤 Sender:', sender.getAddress().toString());
  console.log('👤 Receiver:', receiver.getAddress().toString());

  const amount = 10_000n;

  console.log(`💸 Sending ${amount} ZK from sender to receiver...`);
  const tx = await sender.sendFunds({
    recipient: receiver.getAddress(),
    amount,
  });

  console.log('⏳ Waiting for transaction confirmation...');
  await tx.wait();

  const newBalance = await receiver.getBalance();
  console.log('✅ Transfer completed. Receiver balance:', newBalance.toString());
}

main().catch(err => {
  console.error('❌ Error:', err);
});
