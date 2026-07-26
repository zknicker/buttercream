export function renderInputPreview(): string {
  return `<div class="specimens">
    <section class="specimen">
      <input aria-label="Name" class="input" name="name" placeholder="Enter your name" />
      <div class="specimen__label">Default</div>
    </section>
    <section class="specimen">
      <div class="input-demo input-demo--types">
        <label class="input-field">
          <span class="input-field__label">Email</span>
          <input class="input input--full-width" name="email" type="email" value="jane@example.com" />
        </label>
        <label class="input-field">
          <span class="input-field__label">Age</span>
          <input class="input input--full-width" name="age" type="number" value="30" />
        </label>
        <label class="input-field">
          <span class="input-field__label">Password</span>
          <input class="input input--full-width" name="password" type="password" value="buttercream" />
        </label>
      </div>
      <div class="specimen__label">Types</div>
    </section>
    <section class="specimen">
      <label class="input-field">
        <span class="input-field__label">Website</span>
        <input class="input" name="website" type="url" value="buttercream.studio" />
        <span class="input-field__helper">https://buttercream.studio</span>
      </label>
      <div class="specimen__label">Controlled</div>
    </section>
    <section class="specimen">
      <div class="input-demo">
        <input aria-label="Primary input" class="input input--full-width" name="primary" placeholder="Primary" />
        <input aria-label="Secondary input" class="input input--secondary input--full-width" name="secondary" placeholder="Secondary" />
      </div>
      <div class="specimen__label">Variants</div>
    </section>
    <section class="specimen">
      <div class="surface surface-demo">
        <input aria-label="Input on surface" class="input input--secondary input--full-width" name="surface" placeholder="Enter your name" />
      </div>
      <div class="specimen__label">On surface</div>
    </section>
    <section class="specimen">
      <input aria-label="Disabled input" class="input" disabled name="disabled" placeholder="Enter your name" />
      <div class="specimen__label">Disabled</div>
    </section>
  </div>`;
}
