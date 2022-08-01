import debounce from 'lodash.debounce';

function createAutoComplete<T>({
  root,
  renderItem,
  onItemSelect,
  inputValue,
  fetchData,
}: {
  root: HTMLElement;
  inputValue(item: T): string;
  renderItem(item: T): string;
  onItemSelect(item: T): void;
  fetchData(searchTerm: string): Promise<T[]>;
}) {
  root.insertAdjacentHTML(
    'beforeend',
    `
      <label>
        <b>Search For an Item</b>
        <input class="input" />
      </label>
      <div class="dropdown">
        <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
        </div>
      </div>
    `
  );

  const input = root.querySelector<HTMLInputElement>('input')!;
  const dropdown = root.querySelector<HTMLInputElement>('.dropdown')!;
  const resultsWrapper = root.querySelector<HTMLInputElement>('.results')!;

  const handleClick = async (e: Event, item: T) => {
    e.preventDefault();
    dropdown.classList.remove('is-active');
    input.value = inputValue(item);
    onItemSelect(item);
  };

  input.addEventListener(
    'input',
    debounce(async (event: Event) => {
      if (!(event.target instanceof HTMLInputElement)) return;

      const data = await fetchData(event.target.value);

      resultsWrapper.innerText = '';

      if (!data.length) {
        dropdown.classList.remove('is-active');
        return;
      }

      dropdown.classList.add('is-active');

      for (const item of data) {
        resultsWrapper.insertAdjacentHTML('beforeend', renderItem(item));
      }

      for (const [i, item] of Array.from(
        dropdown.querySelectorAll('.dropdown-item')
      ).entries()) {
        item.addEventListener('click', e => handleClick(e, data[i]), false);
      }
    }, 500)
  );

  document.addEventListener('click', event => {
    if (!root.contains(event.target as HTMLElement)) {
      dropdown.classList.remove('is-active');
    }
  });
}

export default createAutoComplete;
