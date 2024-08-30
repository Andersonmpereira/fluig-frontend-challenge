export const createSlot = (slotName, content) => {
  const slot = document.createElement('div');
  slot.setAttribute('slot', slotName);
  slot.textContent = content;
  return slot;
}