<?php
use PHPUnit\Framework\TestCase;

class ValidatorGreaterEqualTest extends TestCase
{
    public function testGreaterEqual()
    {

		$validator = new \ioValidate\Validator\greaterequal( array( 'value' => 'value2' ) );

		// Need to pass in value with a key that matches the 'value' setting
		$values = (new \ioValidate\Values())->FromArray( array( 'value2' => 1 ) );

		// Equal
		$this->assertTrue( $validator->Validate( 1, $values ) );
		// Greater
		$this->assertTrue( $validator->Validate( 2, $values ) );

		// Less -- should fail
		$this->assertFalse( $validator->Validate( 0, $values ) );
    }
}
?>
