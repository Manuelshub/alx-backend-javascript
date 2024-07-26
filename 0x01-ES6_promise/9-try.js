export default function guardrail(mathFunction) {
  const queue = [];

  try {
    const mathFunc = mathFunction();
    queue.push(mathFunc);
  } catch (error) {
    queue.push(`Error: ${error.message}`);
  } finally {
    queue.push('Guardrail was processed');
  }
  return queue;
}
