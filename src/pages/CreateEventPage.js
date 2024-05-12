export default function CreateEventPage() {
    return (
        <div>
            <h1>RecieverPage</h1>
            <form>
                <label htmlFor="campaignName">Campaign Name:</label>
                <input type="text" id="campaignName" name="campaignName" />

                <label htmlFor="goalAmount">Goal Amount:</label>
                <input type="number" id="goalAmount" name="goalAmount" />

                <button type="submit">Create Campaign</button>
            </form>
        </div>
    );
  }