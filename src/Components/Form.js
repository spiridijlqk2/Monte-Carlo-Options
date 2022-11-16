import {TextInput, Checkbox, Button, Group, Box, NumberInput} from '@mantine/core';
import { useForm } from '@mantine/form';
import stochasticEuler from "../Util/stochasticEuler";

function Form({onChange}) {
    const form = useForm({
        initialValues: {
            timesteps: 200,
            K: 5,
            r: 0.1,
            Sigma: 0.40,
            T: 0.50,
            s: 40,
        },

        validate: {
            timesteps: (value) => (/^[0-9.]*$/.test(value) ? null : 'Invalid input'),
            K: (value) => (/^[0-9.]*$/.test(value) ? null : 'Invalid input'),
            r: (value) => (/^[0-9.]*$/.test(value) ? null : 'Invalid input'),
            Sigma: (value) => (/^[0-9.]*$/.test(value) ? null : 'Invalid input'),
            T: (value) => (/^[0-9.]*$/.test(value) ? null : 'Invalid input'),
            s:(value) => (/^[0-9.]*$/.test(value) ? null : 'Invalid input'),
            simulations:(value) => (/^[0-9.]*$/.test(value) ? null : 'Invalid input'),
        },
    });

    const onSubmitHandler = (data) => {
        let a = [];
        for(let i = 0;i<data.timesteps;i++){
            a.push(i % 20 === 0 ? i : '');
        }
        let result = {
            graphData: {
                xData: stochasticEuler(data).map(a => Math.round(a)),
                yData: a,
            },
            data
        };
        onChange(result);
    }

    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            <form onSubmit={form.onSubmit(onSubmitHandler)}>
                <NumberInput
                    withAsterisk
                    label="timesteps"
                    placeholder="timesteps"
                    {...form.getInputProps('timesteps')}
                />

                <NumberInput precision={2}
                    withAsterisk
                    label="K"
                    placeholder="K"
                    {...form.getInputProps('K')}
                />

                <NumberInput precision={2}
                    withAsterisk
                    label="r"
                    placeholder="r"
                    {...form.getInputProps('r')}
                />

                <NumberInput precision={2}
                    withAsterisk
                    label="Sigma"
                    placeholder="Sigma"
                    {...form.getInputProps('Sigma')}
                />

                <NumberInput precision={2}
                    withAsterisk
                    label="T"
                    placeholder="T"
                    {...form.getInputProps('T')}
                />
                <NumberInput precision={2}
                             withAsterisk
                             label="s"
                             placeholder="s"
                             {...form.getInputProps('s')}
                />
                <NumberInput precision={2}
                             withAsterisk
                             label="simulations"
                             placeholder="simulations"
                             {...form.getInputProps('simulations')}
                />

                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    );
}

export default Form
