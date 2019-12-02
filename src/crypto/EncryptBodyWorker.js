const { workerData, parentPort } = require("worker_threads");
const forge = require("node-forge");

try {
  const key = forge.pki.publicKeyFromPem(forge.util.decode64(workerData.publickey));
  const content = workerData.content;
  Object.keys(content).map((entry) => {
    if (content[entry] !== null) {
      if (Array.isArray(content[entry])) {
        content[entry].map((v, i) => {
          content[entry][i] = forge.util.encode64(
            key.encrypt(forge.util.encode64(content[entry][i]), "RSA-OAEP", { md: forge.md.sha512.create() })
          );
        });
      } else {
        content[entry] = forge.util.encode64(
          key.encrypt(forge.util.encode64(content[entry]), "RSA-OAEP", { md: forge.md.sha512.create() })
        );
      }
    }
  });
  parentPort.postMessage(content);
} catch (err) {
  console.error("error in encryption body worker", err);
  throw new Error(err);
}
